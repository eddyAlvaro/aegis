import { Logger } from '@nestjs/common';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

// TODO: check if this interface already exists
interface FilterOption {
  field: string;
  type: 'equal' | 'like' | 'in' | 'between' | 'not' | 'not-in';
  value: any;
}

export function applyFilters<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  filters: FilterOption[],
  alias: string,
  logger: Logger | null = null,
) {
  const cleanFilters = filters
    .filter((e) => e.value !== '')
    .filter((e) => {
      if (e.type === 'in' || e.type === 'not-in') {
        return Array.isArray(e.value) && e.value.length > 0;
      }
      return true;
    });
  cleanFilters.forEach((filter, index) => {
    const { field, type, value } = filter;
    logger?.debug(`appyFilters - filter ${index}: ${JSON.stringify(filter)}`);

    let fieldWithAlias: string;

    if (field.includes('.')) {
      fieldWithAlias = field;
    } else {
      fieldWithAlias = `${alias}.${field}`;
    }
    const paramName = `${field}_${index}`;

    console.log('fieldWithAlias', fieldWithAlias);
    switch (type) {
      case 'equal':
        if (isValidDate(value)) {
          queryBuilder.andWhere(`DATE(${fieldWithAlias}) = :${paramName}`, {
            [paramName]: value,
          });
        } else {
          if (value !== null) {
            queryBuilder.andWhere(`${fieldWithAlias} = :${paramName}`, {
              [paramName]: value,
            });
          } else {
            logger?.debug(
              `Applying IsNull filter for field ${fieldWithAlias}, ${paramName}`,
            );
            queryBuilder.andWhere(`${fieldWithAlias} IS NULL`);
          }
        }

        break;
      case 'like':
        queryBuilder.andWhere(`${fieldWithAlias} ILIKE :${paramName}`, {
          [paramName]: `%${value}%`,
        });
        break;
      case 'in':
        queryBuilder.andWhere(`${fieldWithAlias} IN (:...${paramName})`, {
          [paramName]: value,
        });
        break;
      case 'between':
        if (Array.isArray(value) && value.length === 2) {
          queryBuilder.andWhere(
            `${fieldWithAlias} BETWEEN :${paramName}_start AND :${paramName}_end`,
            {
              [`${paramName}_start`]: value[0],
              [`${paramName}_end`]: value[1],
            },
          );
        }
        break;
      case 'not':
        queryBuilder.andWhere(`${fieldWithAlias} != :${paramName}`, {
          [paramName]: value,
        });
        break;
      case 'not-in':
        queryBuilder.andWhere(`${fieldWithAlias} NOT IN (:...${paramName})`, {
          [paramName]: value,
        });
        break;
      default:
        throw new Error(`Unsupported filter type: ${type}`);
    }
  });
}

// TODO: check if this interface already exists
interface SortOption {
  field: string;
  order: 'asc' | 'desc';
}

export function applySorts<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  sorts: SortOption[],
  alias: string,
) {
  sorts.forEach((sort) => {
    const { field, order } = sort;

    console.log(`Applying sort: ${JSON.stringify(sort)}`);

    let fieldWithAlias: string;

    if (field.includes('.')) {
      fieldWithAlias = field;
    } else {
      fieldWithAlias = `${alias}.${field}`;
    }

    queryBuilder.addOrderBy(
      fieldWithAlias,
      order.toUpperCase() as 'ASC' | 'DESC',
    );
  });
}

function isValidDate(dateString: string): boolean {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);

  const isValid =
    !isNaN(date.getTime()) && dateString === date.toISOString().slice(0, 10);

  return isValid;
}

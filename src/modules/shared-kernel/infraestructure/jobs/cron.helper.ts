export function getCronInterval(
  defaultCron: string,
  env: string = process.env.NODE_ENV || 'development',
): string {
  if (env === 'development') {
    // Ajustar para QA (cada minuto)
    return '* * * * *'; // Cron expression para cada minuto
  }
  return defaultCron; // Mantén el intervalo original para producción/desarrollo
}

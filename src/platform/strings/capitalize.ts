export class StringUtils {
  public static capitalizeFirstLetter(text: string): string {
    const lowerCased = text.toLowerCase();
    return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
  }
}

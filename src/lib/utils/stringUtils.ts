export const capitalize = (str: string): string => {
return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str: string): string => {
return str
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')    // Remove non-word characters
    .replace(/\-\-+/g, '-')      // Replace multiple hyphens with a single one
    .replace(/^-+/, '')          // Remove leading hyphens
    .replace(/-+$/, '');         // Remove trailing hyphens
};

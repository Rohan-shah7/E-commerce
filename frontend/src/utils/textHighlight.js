// Function to highlight matching text
export const highlightText = (text, searchTerm) => {
  if (!searchTerm || typeof text !== 'string') return text;
  
  const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return `<mark class="bg-yellow-200 dark:bg-yellow-700 rounded-sm px-1">${part}</mark>`;
    }
    return part;
  }).join('');
};

// export const handleError = (
//   error: unknown,
//   setError: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   if (error instanceof Error) {
//     setError(error.message);
//   } else {
//     setError("An unexpected error occurred!");
//   }
// };
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if ('status' in error && 'data' in error) {
      return `Error: Status ${error.status} - ${JSON.stringify(error.data)}`;
    }
    return error.message || 'An error occurred';
  }
  
  return 'An unknown error occurred';
};

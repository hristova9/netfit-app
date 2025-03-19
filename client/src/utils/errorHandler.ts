export const handleError = (
  error: unknown,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError("An unexpected error occurred!");
  }
};

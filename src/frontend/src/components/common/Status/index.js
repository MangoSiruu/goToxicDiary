export function getStatus({ isLoading, isError, isSuccess }) {
  if (isLoading) {
    return 'loading';
  }

  if (isError) {
    return 'error';
  }

  if (isSuccess) {
    return 'success';
  }

  return 'idle';
}

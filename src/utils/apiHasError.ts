export type APIError = {
  reason: string
}

export function hasError(response: any): response is APIError {
  return response && response.reason;
}

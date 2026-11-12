interface GetTargetDimension {
  (data: { fallback: number; natural: number | undefined }): number
}

export const getTargetDimension: GetTargetDimension = ({
  fallback,
  natural,
}) => (natural !== undefined && natural !== 0 ? natural : fallback)

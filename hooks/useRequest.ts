import { useState } from 'react'

export type UseRequestOpts<T, K> = {
  initialValues?: T
  params?: Partial<K>
  onSuccess?: (data: T, input: K) => void
  onError?: (error: Error) => void
  onFinally?: () => void
}

export const useRequest = <F extends (input: Parameters<F>[number]) => ReturnType<F>>(
  handler: F,
  opts?: UseRequestOpts<Awaited<ReturnType<F>>, Parameters<F>[number]>
): [
  (params: Parameters<F>[number], options?: Pick<UseRequestOpts<Awaited<ReturnType<F>>, Parameters<F>[number]>, 'onSuccess' | 'onError' | 'onFinally'>) => void,
  {
    data: Awaited<ReturnType<F>> | undefined
    loading: boolean
    updateData: (data?: Awaited<ReturnType<F>>) => void
  }
] => {
  const [data, setData] = useState<Awaited<ReturnType<F>> | undefined>(opts?.initialValues)
  const [loading, setLoading] = useState(false)

  const updateData = (data?: Awaited<ReturnType<F>>) => {
    setData(data)
  }

  const fetch = async (params: Parameters<F>[number], options?: Pick<UseRequestOpts<Awaited<ReturnType<F>>, Parameters<F>[number]>, 'onSuccess' | 'onError' | 'onFinally'>) => {
    try {
      setLoading(true)

      const response = await handler({ ...opts?.params, ...params })

      const value = response as Awaited<ReturnType<F>>
      setData(value)
      options?.onSuccess ? await options?.onSuccess(value, params) : await opts?.onSuccess?.(value, params)
    } catch (err) {
      const error = err as Error

      if (!options?.onError) {
        // toast.error({
        //   message: error.message,
        // })
      }

      options?.onError ? await options?.onError(error) : await opts?.onError?.(error)
    } finally {
      setLoading(false)

      options?.onFinally?.()
    }
  }

  return [fetch, { data, loading, updateData }]
}

import { useEffect, useState } from "react"

export function useCountUpText(
  target: number,
  unit: string,
  duration: number,
  start: boolean,
  decimalPlaces: number = 0
): string {
  const [value, setValue] = useState("0" + unit)

  useEffect(() => {
    if (!start) return

    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentValue = progress * target
      const formatted =
        decimalPlaces > 0
          ? currentValue.toFixed(decimalPlaces)
          : Math.floor(currentValue).toString()

      setValue(formatted + unit)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [target, duration, start, unit, decimalPlaces])

  return value
}

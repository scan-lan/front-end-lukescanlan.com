import { Ref, useEffect, useState } from "react"

export const useContainerDimensions = (ref: Ref<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (ref && typeof ref === "object") {
      const getDimensions = (prevDimensions: {
        width: number
        height: number
      }) => ({
        width: ref.current?.offsetWidth || prevDimensions.width,
        height: ref.current?.offsetHeight || prevDimensions.height,
      })

      if (ref.current) {
        setDimensions((prevDimensions) => getDimensions(prevDimensions))
      }

      const handleResize = () => {
        setDimensions((prevDimensions) => getDimensions(prevDimensions))
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [ref])

  return dimensions
}

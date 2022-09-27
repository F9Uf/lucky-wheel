export const delayInSecond = (duration: number) => new Promise((resolve, reject) => setTimeout(resolve, duration * 1000))

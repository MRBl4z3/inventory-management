


export async function delay(ms: number = 500) {
    return await new Promise(r => setTimeout(r, ms))
}
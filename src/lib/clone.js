export default function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
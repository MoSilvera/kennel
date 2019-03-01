const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/animals/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${remoteURL}/animals`).then(e => e.json())
  },
  deleteOne(id) {
    return fetch(`http://localhost:5002/animals/${id}`, {
        "method": "DELETE"
    })
    .then(r => r.json())
}
}
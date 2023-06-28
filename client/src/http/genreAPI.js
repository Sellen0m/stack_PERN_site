import { $authHost, $host } from "."

export const createGenres = async (genres) => {
    const {data} = await $authHost.post('api/genres', genres)
    return data
}

export const fetchGenres = async () => {
    const {data} = await $host.get('api/genres')
    return data
}

export const fetchOneGenres = async (id) => {
    const {data} = await $host.get('api/genres/' + id)
    return data
}

export const updateGenre = async (id,genre) => {
    const {data} = await $authHost.put('api/genres/' + id, genre)
    return data
}

export const createGroups = async (groups) => {
    const {data} = await $authHost.post('api/groups', groups)
    return data
}

export const fetchGroups = async (Genres_id) => {
    const {data} = await $host.get('api/groups', {params:{Genres_id}})
    return data
}

export const fetchOneGroups = async (id) => {
    const {data} = await $host.get('api/groups/' + id)
    return data
}

export const updateGroup = async (id,Param,group) => {
    const {data} = await $authHost.put('api/groups/' + id + '/' + Param, group)
    return data
}

export const deleteGroup = async (id) => {
    const {data} = await $authHost.delete('api/groups/'+ id)
    return data
}

export const createSongs = async (song) => {
    const {data} = await $authHost.post('api/songs', song)
    return data
}

export const fetchSongs = async (Groups_id) => {
    const {data} = await $host.get('api/songs', {params : {Groups_id}})
    return data
}

export const updateSong = async (id,Param,song) => {
    const {data} = await $authHost.put('api/songs/' + id + '/' + Param, song)
    return data
}

export const deleteSong = async (id) => {
    const {data} = await $authHost.delete('api/songs/'+ id)
    return data
}
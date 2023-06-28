import {makeAutoObservable} from "mobx";

export default class GroupsStore {
    constructor() {
        this._genres = []
        this._groups = []
        this._songs = []
        this._groupsSongs = []
        this._selectedGenre = {}
        this._selectedGroup = {}
        this._selectedSong = {}
        makeAutoObservable(this)
    }

    setGenres(genres) {this._genres = genres}
    setGroups(groups) {this._groups = groups}
    setSongs(songs) {this._songs = songs}
    setGroupsSongs(groupsSongs) {this._groupsSongs = groupsSongs}
    setSelectedGenre(genre){this._selectedGenre = genre}
    setSelectedGroup(group){this._selectedGroup = group}
    setSelectedSong(song){this._selectedSong = song}

    get genres() {return this._genres}
    get groups() {return this._groups}
    get songs() {return this._songs}
    get groupsSongs() {return this._groupsSongs}
    get selectedGenre() {return this._selectedGenre}
    get selectedGroup() {return this._selectedGroup}
    get selectedSong() {return this._selectedSong}
}

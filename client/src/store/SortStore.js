import {makeAutoObservable} from "mobx";

export default class SortStore {
    constructor() {
        this._sorts = [
            {id: 1, label: 'В алфавитном порядке'},
            {id: 2, label: 'Наоборот'}
        ]
        this._selectedSort = {}
        makeAutoObservable(this)
    }
    setSelectSort(sort){ this._selectedSort = sort}

    get sorts(){return this._sorts}
    get selectedSort(){return this._selectedSort}

}

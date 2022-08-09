import axios from "axios"
import { Book } from "../../backend/database/repos/bookrepo"

const urlPrefix = 'http://localhost:8000'


export const getBooks = (): Promise<Book[]> => {
    const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return axios.get<Book[]>(urlPrefix + "/books",
        {
            headers: headers
        }
    )
    .then(response => response.data);
}

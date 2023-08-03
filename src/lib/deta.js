import { Deta } from "deta";

export default function connectToDeta(){
    const deta = Deta();

    const db = deta.Base('urls');

    return db
}
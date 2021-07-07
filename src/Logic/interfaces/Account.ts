import Site from './enums/Site'

interface Account {
    site: Site,
    username: string,
    password: string
}

export interface AccountGroup {
    name: string,
    site: Site,
    accounts: Account[]
}


export default Account;
import Site from './enums/Site'

interface Account {
    site: Site,
    username: string,
    password: string
}

export default Account;
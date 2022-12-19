import { compare, hash } from 'bcryptjs'

export async function hashPass(pass) {
    return await hash(pass, 12);
}

export async function validatePass(pass, hashedPass) {
    return await compare(pass, hashedPass)
}
import { compare, hash } from 'bcryptjs'

export async function hashPass(pass) {
    const hashedPass = await hash(pass, 12);
    return hashedPass;
}

export async function validatePass(pass, hashedPass) {
    const isValid = await compare(pass, hashedPass)
    return isValid
}
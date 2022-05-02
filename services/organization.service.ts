import { AppDataSource } from "../config/dbconfig"
import { Organization } from "../models/organization.entity"
import { OrganizationDto } from "../types"

export const saveOrganization = async (dto: OrganizationDto): Promise<Organization> => {
    const repo = AppDataSource.getRepository(Organization)
    const { code, id } = dto

    const org = repo.create({ id, code })

    return repo.save(org)
}


export const getOrganization = async (id: string): Promise<Organization | null> => {
    const repo = AppDataSource.getRepository(Organization)
    const obj = await repo.findOneBy({ id })
    return obj
}
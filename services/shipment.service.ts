import { AppDataSource } from "../config/dbconfig"
import { Organization } from "../models/organization.entity"
import { Shipment } from "../models/shipment.entity"
import { TransportPacks } from "../models/transport-packs.entity"
import { ShipmentDto } from "../types"

export const saveShipment = async (dto: ShipmentDto) => {
    const repo = AppDataSource.getRepository(Shipment)
    const transportPackRepo = AppDataSource.getRepository(TransportPacks)

    const { referenceId, organizations, estimatedTimeArrival } = dto

    const shipmentInDB = await repo.findOne({ where: { referenceId }, relations: ['transportPacks']})
    const orgs = await findOrganizations(organizations)

    const shipment = repo.create({
        estimatedTimeArrival,
        referenceId,
    })
    shipment.organizations = orgs
    shipment.transportPacks = dto.transportPacks as any

    if (shipmentInDB) {
        shipment.id = shipmentInDB.id
        await transportPackRepo.remove(shipmentInDB.transportPacks)
    }

   return repo.save(shipment)
}

export const getShipment = async (id: string): Promise<Shipment | null> => {
    const repo = AppDataSource.getRepository(Shipment)
    const obj = await repo.findOne({ where: { id }, relations: ['transportPacks', 'transportPacks.nodes', 'transportPacks.nodes.totalWeight']})
    return obj
}

const findOrganizations = async (codes: string[]): Promise<Organization[]> => {
    const repo = AppDataSource.getRepository(Organization)
    const orgs: Organization[] = []

    for await (const code of codes) {
        const found = await repo.findOneBy({ code })
        if(found) orgs.push(found)
    }

    return orgs
}
export interface OrganizationDto {
    id: string
    type: string
    code: string
}

export interface ShipmentDto {
    type: string
    referenceId: string
    organizations: string[]
    estimatedTimeArrival: string
    transportPacks: {
        nodes:  Node[]
    }
}

interface Node {
    totalWeight: TotalWeight[]
}

interface TotalWeight {
    weight: string
    unit: string
}


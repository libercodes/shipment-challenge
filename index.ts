import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import "reflect-metadata"
import { AppDataSource } from './config/dbconfig';
import * as dotenv from 'dotenv'
import { saveOrganization, getOrganization } from './services/organization.service';
import { OrganizationDto, ShipmentDto } from './types';
import { getShipment, saveShipment } from './services/shipment.service';
import { validate } from 'uuid';

dotenv.config()

const app = express()
app.use(bodyParser.json());
const port = process.env.PORT

app.post('/shipment', async (req: Request, res: Response) => {
  const dto: ShipmentDto = req.body
  const shipment = await saveShipment(dto)
  return res.json({ data: shipment })
})

app.post('/organization', async (req: Request, res: Response) => {
  const dto: OrganizationDto = req.body
  const org = await saveOrganization(dto)
  
  return res.json({ data: org })
})

app.get('/shipment/:shipmentId', async (req: Request, res: Response) => {
  const id = req.params['shipmentId'];
  if (!id || !validate(id)) return res.status(400).json({ message: 'id not provided' })

  const org = await getShipment(id);
  return res.json({ data: org })
})

app.get('/organization/:organizationId', async (req: Request, res: Response) => {
  const id = req.params['organizationId'];
  if (!id || !validate(id)) return res.status(400).json({ message: 'id not provided' })

  const org = await getOrganization(id);
  return res.json({ data: org })
})

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
  await AppDataSource.initialize()
  console.log("Db connected")
})

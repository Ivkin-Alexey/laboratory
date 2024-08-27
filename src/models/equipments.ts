export type EquipmentID = string

export interface EquipmentItem {
  id: EquipmentID
  category: string
  description: string
  name: string
  brand: string
  model: string
  imgUrl: string
  isFavorite?: boolean
  isOperate?: boolean
  userID?: string
  userName?: string
}

export interface AvailableEquipments {
  inaccessible: string[] | [], 
  available: string[] | []
}

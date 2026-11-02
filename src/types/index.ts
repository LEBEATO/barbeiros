export interface ServiceData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
}
export interface AppointmentData {
  _id: string;
  customerName: string;
  whatsapp: string;
  serviceName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

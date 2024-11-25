export type Reservation = {
  id: number;
  customerName: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt?: string;
};
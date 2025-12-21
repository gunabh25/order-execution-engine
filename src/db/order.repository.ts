import { pg } from "../config/postgres";

export async function saveOrder(
  orderId: string,
  status: string,
  data: any
) {
  await pg.query(
    `INSERT INTO orders (id, status, data)
     VALUES ($1,$2,$3)
     ON CONFLICT (id)
     DO UPDATE SET status=$2, data=$3`,
    [orderId, status, data]
  );
}

import { log } from "console"
import { prisma } from "./prisma-client"

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'John Doe',
        email: 'vzUg2@example.com',
        password: hashSync('123456', 10),
        verified: new Date(),
        role: 'USER'
      },
      {
        fullName: 'John Doe',
        email: 'admin@example.com',
        password: hashSync('123456', 10),
        verified: new Date(),
        role: 'ADMIN'
      }
    ]
  })
}
async function down() {

}

async function main() {
  try {
    up()
    down()
  } catch (error) {
    log(error)
  }
}
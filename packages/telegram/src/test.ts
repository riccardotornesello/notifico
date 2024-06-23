export async function test() {
  console.log("Waiting for message");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Received message");
}

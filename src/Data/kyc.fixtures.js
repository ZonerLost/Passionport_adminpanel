export function makeKyc(n = 16) {
  const statuses = ["pending", "approved", "rejected"];
  const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
  return Array.from({ length: n }, (_, i) => ({
    id: `k_${i + 1}`,
    brandName: `Brand ${i + 1}`,
    contact: `owner${i + 1}@brand.test`,
    submittedAt: new Date(Date.now() - rnd(1, 30) * 864e5).toISOString(),
    status: statuses[rnd(0, 2)],
    docs: [
      { name: "Certificate of Incorporation.pdf", url: "#" },
      { name: "ID - Director Front.jpg", url: "#" },
    ],
    notes: "",
  }));
}

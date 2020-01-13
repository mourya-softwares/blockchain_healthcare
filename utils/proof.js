const crypto = require("crypto");

const generateProof = previousProof => {
  return new Promise(resolve => {
    setImmediate(async () => {
      let proof = Math.random() * 10000000001;
      const dontMine = process.env.Break;
      if (isProofValid(previousProof, proof) || dontMine === "true") {
        resolve({ proof, dontMine });
      } else {
        resolve(await generateProof(previousProof));
      }
    });
  });
};

const isProofValid = (previousProof, currentProof) => {
  const difference = currentProof - previousProof;
  const proofString = `difference-${difference}`;
  const hashFunction = crypto.createHash("sha256");
  hashFunction.update(proofString);
  const hexString = hashFunction.digest("hex");
  console.log(hexString, proofString, difference);
  if (hexString.includes("0")) {
    return true;
  }
  return false;
};

exports.generateProof = generateProof;
exports.isProofValid = isProofValid;

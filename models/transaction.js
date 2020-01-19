class Transaction {
  constructor(doctor, patient, details) {
    this.doctor = doctor;
    this.patient = patient;
    this.details = details;
    this.timestamp = Date.now();
  }
  getDetails() {
    const { doctor, patient, details, timestamp } = this;
    return {
      doctor,
      patient,
      details,
      timestamp
    };
  }
  parseTransaction(transaction) {
    this.doctor = transaction.doctor;
    this.patient = transaction.patient;
    this.details = transaction.details;
    this.timestamp = transaction.timestamp.valueOf();
  }
}

module.exports = Transaction;

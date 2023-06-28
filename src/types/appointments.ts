export interface Appointment {
    appointmentId: number;
    appointmentType: string;
    createDateTime: string;
    requestedDateTimeOffset: string;
    confirmedDate?: Date;
    user: {
      userId: number;
      firstName: string;
      lastName: string;
      vetDataId: string;
    };
    animal: {
      animalId: number;
      firstName: string;
      species: string | null;
      breed: string | null;
    };
  }
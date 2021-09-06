declare namespace State {
  export type Page = {
    home: {
      category: number;
      accepted: boolean;
    };
    send: {
      contacts: string[];
      transferForm: {
        asset: any;
        amount: string;
        opponent: string;
        memo: string;
      };
      withdrawForm: {
        asset: any;
        amount: string;
        address_id: string;
      };
    };
    snapshot: {
      detail: any;
    };
  };
}

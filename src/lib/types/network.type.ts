type Interface = {
	name: string;
	index: number;
};

type SelectInterfaceProps = {
	interfaces: Interface[];
	onChange: (selected: Interface) => void;
};

type Host = {
	host: string;
	mac: string;
	vendor: string;
	hostname: string;
};

type ScanReportProps = {
	hosts: Host[];
};

export type { Interface, SelectInterfaceProps, Host, ScanReportProps };

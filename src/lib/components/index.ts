/*
 * Common components
 */
import { default as Alert } from './Alert.svelte';
import { default as Device } from './Device.svelte';
import { default as DeviceStats } from './DeviceStats.svelte';
import { default as Person } from './Person.svelte';
import { default as Navbar } from './Navbar.svelte';
import { default as WeatherCard } from './WeatherCard.svelte';

/*
Controls
*/
import { default as AddDevice } from './controls/AddDevice.svelte';
import { default as AddPerson } from './controls/AddPerson.svelte';
import { default as Lights } from './controls/Lights.svelte';

/*
Modals
 */
import { default as SettingsModal } from './modals/SettingsModal.svelte';
import { default as InfoModal } from './modals/InfoModal.svelte';
import { default as AddPersonModal } from './modals/AddPersonModal.svelte';
import { default as TermsAndConditionsModal } from './modals/TermsConditionsModal.svelte';
import { default as EditPersonModal } from './modals/EditPersonModal.svelte';

/*
 * Loading skeletons
 */
import { default as GraphCardLoading } from './loading/GraphCardLoading.svelte';
import { default as WeatherCardLoading } from './loading/WeatherCardLoading.svelte';

/*
 * Charts
 */
import { default as NetworkDevices } from './NetworkDevices.svelte';
import { default as ChartsWrapper } from './graphs/ChartsWrapper.svelte';

/*
 * Login and Register
 */

export {
	Alert,
	Device,
	DeviceStats,
	Person,
	Navbar,
	WeatherCard,
	AddDevice,
	AddPerson,
	Lights,
	SettingsModal,
	InfoModal,
	AddPersonModal,
	EditPersonModal,
	GraphCardLoading,
	WeatherCardLoading,
	NetworkDevices,
	ChartsWrapper,
	TermsAndConditionsModal
};

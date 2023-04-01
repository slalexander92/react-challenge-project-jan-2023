export const dateService = {
  convertDateTimeToTwelveHour,
};

function convertDateTimeToTwelveHour(dateTime) {
	return dateTime.toLocaleTimeString('en-US', { hour12: true });
}

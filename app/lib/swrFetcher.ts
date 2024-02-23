export default function swrFetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Photos = ({ data }) => {
	const listPhotos = data.slice(0, 10).map((photo) => {
		return (
			<div key={photo.id}>
				<Link href={`/photos/${photo.id}`}>
					<Image src={photo.download_url} width="600" height="400" />
				</Link>
			</div>
		);
	});
	return (
		<div>
			<h1>Nos photos souvenirs</h1>
			{listPhotos}
		</div>
	);
};

export default Photos;

async function getPhotos() {
	const res = await fetch("https://picsum.photos/v2/list");

	const json = await res.json();
	return json;
}

export async function getServerSideProps() {
	const data = await getPhotos();

	return {
		props: {
			data,
		},
	};
}

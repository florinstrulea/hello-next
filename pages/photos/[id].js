import React from "react";
import Image from "next/image";

const Photo = ({ data }) => {
	return (
		<div>
			<h1>{data.author}</h1>
			<Image src={data.download_url} width="600" height="400" />
		</div>
	);
};

export default Photo;
async function getPhoto(id) {
	const res = await fetch(`https://picsum.photos/id/${id}/info`);

	const json = await res.json();
	return json;
}
//SSG
export async function getStaticPaths() {
	return {
		paths: [{ params: { id: "0" } }, { params: { id: "1" } }],

		//Si fallback est à false, les seuls pages qui seront générés sont celles spécifiées dans le tableau paths
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const data = await getPhoto(params.id);
	return {
		props: { data },
	};
}

//SSR
// export async function getServerSideProps({ params }) {
// 	const data = await getPhoto(params.id);
// 	return {
// 		props: { data },
// 	};
// }

import {
  getCloudConfig,
  getCloudSignature,
} from '../(admin)/admin/products/actions';

export const uploadImage = async (file: File) => {
  const cloudConfig = await getCloudConfig();
  const { timestamp, signature } = await getCloudSignature();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', cloudConfig.key);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudConfig.name}/image/upload`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  console.log(data);
};

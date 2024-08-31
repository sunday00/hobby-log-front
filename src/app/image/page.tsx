'use client'

import React, {useState} from 'react'

const Image = () => {
  const [base64, setBase64] = useState('');

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onUpdate = async (evt: React.ChangeEvent) => {
    const file = (evt.target as HTMLInputElement).files?.[0]

    if (file) {
      // setBase64(URL.createObjectURL(file))
      setBase64(await toBase64(file) as string)
    }
  }

  return <div>
    <textarea name="base64" id="base64" cols={80} rows={8} value={base64} readOnly></textarea>

    { base64 ? <img src={base64} alt="" width={200} /> : ''}

    <input type="file" name="image" id="image" onChange={onUpdate} />
    <input type="button" value="encode" />
  </div>
}

export default Image
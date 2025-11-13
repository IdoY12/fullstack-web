import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import config from "config"

const s3Config = config.get<AppConfig['s3']>('s3')

const s3Client = new S3Client({
    ...s3Config.connection,
    credentials: { ...s3Config.connection.credentials }
})

export async function createAppBucketIfNotExists() {
    try {
        const result = await s3Client.send(
            new CreateBucketCommand({
                Bucket: s3Config.bucket
            })
        )
        console.log(result)
    } catch(e) {
        console.log('bucket creation failed. silenting exception, bucket already exists', e)
    }
}

export async function testUpload() {
    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: s3Config.bucket,
                Key: 'test.txt',
                ContentType: 'text/plain',         // <-- this is the mime type of text file
                Body: 'hello world, local stack seems to work'
            }
        })
        const result = await upload.done()
        console.log('upload result: ', result)
    } catch(e) {
        console.log('exception in test upload: ', e)
    }
}

export default s3Client
import { CronJob } from 'cron'
import { User } from '../models/user.js'

export const removeUnvarifiedAccount = () => {
    const job = new CronJob('0 0 0 * * *', async () => {
            try {
                const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

                const users = await User.find({
                    isVerified: false,
                    createdAt: { $lte: sevenDaysAgo }
                })

                for (const user of users) {
                    await user.deleteOne()
                }

                console.log(`Removed ${users.length} unverified users older than 7 days`)
            } catch (err) {
                console.error('Error running cron job:', err)
            }
        },
        null, // onComplete
        true  // start immediately
    )

    return job
}

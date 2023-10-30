import { IMigrationContext } from '../migration-context';
import forEachRepo from '../util/for-each-repo';

export default async (context: IMigrationContext, options: any) => {
  const { adapter, logger } = context;

  await forEachRepo(context, async (repo) => {
    const spinner = logger.spinner('Pushing changes');
    try {
      await adapter.pushRepo(repo, options.force, options.noVerify);
      spinner.succeed('Changes pushed');
    } catch (e: any) {
      logger.error(e);
      spinner.fail('Failed to push changes');
    }
  });
};

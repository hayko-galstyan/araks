import { GET_TEMPLATES_PUBLIC,GET_TEMPLATES_MY} from 'api/project-templates/use-get-templates-my';
import { ProjectList } from 'components/layouts/project-list';
import { MyTemplates } from './components/my-templates';
import { SearcTemplete } from './components/search-template';
import { useState } from 'react';

export const Template = () => {
  const [search, setSearch]= useState<string>('');

  return (
    <ProjectList>
        <SearcTemplete search={search} setSearch={setSearch}/>
        <MyTemplates  title="My tamplates" projectsUrl={GET_TEMPLATES_MY} search = {search} showOptions={true} />
        <MyTemplates  title="Public templates" projectsUrl={GET_TEMPLATES_PUBLIC}  search = {search} showOptions={false} />
    </ProjectList>
  );
};

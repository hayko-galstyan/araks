export interface IGroupParams {
  name: string;
  description: string;
}

export type TGroupItem = {
  admin: {
    id: string;
  };
  id: string;
  members_count: string;
  description: string;
  name: string;
  projects_count: string;
};

export type TGroupsData = {
  count: number;
  data: TGroupItem[];
};

export interface IProjectParams {
  group_id: string | undefined;
  project_id: string | undefined;
}

export type TProjectItem = {
  id: string;
  project: {
    description: string;
    icon: string;
    id: string;
    title: string;
    color: string;
    created_at: string;
    folder_id: string | null;
    updated_at: string;
    user: {
      id: string;
    };
  };
};

export type TUseGroupProjectsData = {
  count: number;
  data: Array<TProjectItem>;
};

export type TMemberItem = {
  id: string;
  role: 'owner' | 'edit' | 'view';
  member: {
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    id: string;
  };
};

export type TMembersData = {
  count: number;
  data: TMemberItem[];
};

export type TGroupNewMemberProps = {
  group_id: string;
  user_id: string;
  role: string;
};

export type TMemberUpdatedProps = {
  user_id: string;
  role: string;
};

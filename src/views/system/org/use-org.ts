import { clientService } from "@/services/client-service";
import { systemApi } from "@/constants/api/system-api";
import { Constants } from "@/constants/constants";
import { useNotice } from "@/components/element-plus/notice";
import { Ref } from "vue";
import { Options } from "@/model/entity/FormModel";
export type TNode = { supId: string; id: string; name: string; isCom: boolean; leaf: boolean; level: number; children: TNode[] };
const tNodeToOptions = (nodes: TNode[], isCom?: boolean): Options[] => {
  if (!nodes || nodes.length === 0) return [];
  return nodes
    .filter(node => (isCom ? node.isCom : !node.isCom))
    .map(node => {
      return { key: node.id, value: node.name, leaf: node.leaf, children: tNodeToOptions(node.children, isCom) };
    });
};
const findNodeById = (nodes: TNode[], id: string): TNode | undefined => {
  let res;
  for (const node of nodes) {
    if (node.id === id) {
      res = node;
    } else if (node.children?.length > 0) {
      res = findNodeById(node.children, id);
    }
    if (res) break;
  }
  return res;
};
const addChildren = (roots: TNode[], child: TNode) => {
  for (const root of roots) {
    if (root.id === child.supId) {
      root.leaf = false;
      root.children.push(child);
    } else if (root.children.length > 0) {
      addChildren(root.children, child);
    }
  }
};
const compsToTNode = (comps: any[]): TNode[] => {
  const roots = comps
    .filter(com => com.comId === com.comSupComId)
    .map(com => {
      return { supId: com.comTenId, id: com.comId, name: com.comName, isCom: true, leaf: true, level: Number(com.comLevel), children: [...com.sysDeptInfos] };
    });
  const childrens = comps
    .filter(com => roots.findIndex(root => root.id === com.comId) === -1)
    .map(com => {
      return { supId: com.comSupComId, id: com.comId, name: com.comName, isCom: true, leaf: true, level: Number(com.comLevel), children: [...com.sysDeptInfos] };
    });
  childrens.forEach(child => {
    addChildren(roots, child);
  });
  return roots;
};
const deptsToTNode = (depts: any[]): TNode[] => {
  const roots = depts
    .filter(dept => dept.deptId === dept.deptSupDeptId)
    .map(dept => {
      return { supId: dept.deptComId, id: dept.deptId, name: dept.deptName, isCom: false, leaf: true, level: Number(dept.deptLevel), children: [] };
    });
  const childrens = depts
    .filter(dept => roots.findIndex(root => root.id === dept.deptId) === -1)
    .map(dept => {
      return { supId: dept.deptSupDeptId, id: dept.deptId, name: dept.deptName, isCom: false, leaf: true, level: Number(dept.deptLevel), children: [] };
    });
  childrens.forEach(child => {
    addChildren(roots, child);
  });
  return roots;
};
export const useOrg = () => {
  const { message } = useNotice();
  const companyList = (): Promise<TNode[]> => {
    return clientService.general<any[]>(systemApi.companyApi.list).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        res.data.forEach(com => {
          com.sysDeptInfos = deptsToTNode(com.sysDeptInfos);
        });
        return compsToTNode(res.data);
      } else {
        message.error(res.message);
        return [];
      }
    });
  };
  const deptList = (id: string, isCom: boolean): Promise<any[]> => {
    return clientService
      .general<any[]>(systemApi.companyApi.deptList, { id, isCom })
      .then(res => {
        if (res.code === Constants.CODE.SUCCESS) {
          return res.data;
        } else {
          message.error(res.message);
          return [];
        }
      });
  };
  const userList = (id: string, isCom: boolean): Promise<any[]> => {
    return clientService
      .general<any[]>(systemApi.companyApi.userList, { id, isCom })
      .then(res => {
        if (res.code === Constants.CODE.SUCCESS) {
          return res.data;
        } else {
          message.error(res.message);
          return [];
        }
      });
  };
  const addCompany = (body: any, treeData: Ref<TNode[]>): Promise<boolean> => {
    if (!body.comSupComId) {
      body.comLevel = 0;
    } else {
      const supCom: TNode | undefined = treeData.value.find((t: TNode) => t.isCom && t.id === body.comSupComId);
      if (!supCom) {
        /*未找到父级节点*/
        return Promise.resolve(false);
      }
      body.comLevel = supCom ? supCom.level + 1 : 0;
    }
    return clientService.general<TNode[]>(systemApi.companyApi.addCompany, undefined, body).then(res => {
      if (res.code !== Constants.CODE.SUCCESS) {
        message.error(res.message);
      }
      return res.code === Constants.CODE.SUCCESS;
    });
  };
  const addDept = (body: any, treeData: Ref<TNode[]>): Promise<boolean> => {
    if (!body.deptSupDeptId) {
      body.deptLevel = 0;
    } else {
      const supDept: TNode | undefined = treeData.value.find((t: TNode) => !t.isCom && t.id === body.deptSupDeptId);
      if (!supDept) {
        /*未找到父级节点*/
        return Promise.resolve(false);
      }
      body.deptLevel = supDept ? supDept.level + 1 : 0;
    }
    return clientService.general<TNode[]>(systemApi.companyApi.addDept, undefined, body).then(res => {
      if (res.code !== Constants.CODE.SUCCESS) {
        message.error(res.message);
      }
      return res.code === Constants.CODE.SUCCESS;
    });
  };
  const addUser = (body: any): Promise<boolean> => {
    return clientService.general<TNode[]>(systemApi.userApi.adminCreate, undefined, body).then(res => {
      if (res.code !== Constants.CODE.SUCCESS) {
        message.error(res.message);
      }
      return res.code === Constants.CODE.SUCCESS;
    });
  };
  return { companyList, deptList, userList, addCompany, addDept, addUser, findNodeById, tNodeToOptions };
};
